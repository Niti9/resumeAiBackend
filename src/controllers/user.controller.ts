import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { Request, Response } from 'express';


export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            username
        });

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User created successfully",
            user: {
                username: newUser.username,
                email: newUser.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('req.body is ',req.body);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "User Login successfully",
            user: {
                username: user.username,
                email: user.email
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
    }
};