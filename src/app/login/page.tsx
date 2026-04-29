'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions/authActions';
import DotBackground from '../../../components/GridDotBackground';

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {
            const res = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password
            });

            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success('Successfully signed in!');
                router.push('/dashboard');
                router.refresh();
            }
        } else {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('password', formData.password);

            const res = await registerUser(data);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success(res.message || 'Account created!');
                // Auto login after registration
                await signIn('credentials', {
                    redirect: false,
                    email: formData.email,
                    password: formData.password
                });
                router.push('/dashboard');
                router.refresh();
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full bg-[#111] text-white">
            <DotBackground dotSize={0.5} spacing={50} className="min-h-screen">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md bg-black/80 backdrop-blur-md border border-gray-700 p-8 rounded-2xl shadow-2xl"
                    >
                        <h1 className="text-4xl text-neon font-bold text-center mb-2 tracking-wider text-adventure">DICTATOR</h1>
                        <p className="text-gray-400 text-center mb-8">{isLogin ? 'Welcome back!' : 'Join the revolution.'}</p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                                <input 
                                    type="password" 
                                    required
                                    className="w-full bg-[#222] border border-gray-600 rounded-lg px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all mt-4"
                            >
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>

                        <div className="mt-6 flex items-center justify-between">
                            <span className="w-1/5 border-b border-gray-600 lg:w-1/4"></span>
                            <span className="text-xs text-center text-gray-400 uppercase">or continue with</span>
                            <span className="w-1/5 border-b border-gray-600 lg:w-1/4"></span>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button 
                                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                                className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button 
                                onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                                className="w-full flex items-center justify-center gap-2 bg-[#24292e] text-white font-semibold py-3 rounded-lg hover:bg-[#2f363d] transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button 
                                onClick={() => setIsLogin(!isLogin)} 
                                className="text-blue-500 hover:text-blue-400 font-semibold underline"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </motion.div>
                </div>
            </DotBackground>
        </div>
    );
}
