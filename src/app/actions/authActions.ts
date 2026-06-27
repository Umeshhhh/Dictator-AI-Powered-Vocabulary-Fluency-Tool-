'use server';

import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { getIp } from "@/lib/request";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      return { error: "Missing required fields" };
    }

    const limits = {
      key: `rate:register:${await getIp()}`,
      limit: 3,
      windowSeconds: 60 * 60
    };

    const limit = await rateLimit(limits);

    if(!limit.success) {
      return {
        error: "Too many signup attemps. Please try again in a bit"
      }
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return { success: true, message: "Account created successfully!" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Internal server error during registration." };
  }
}
