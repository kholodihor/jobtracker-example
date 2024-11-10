import axios from 'axios';
import { useState, useEffect } from 'react';

const ResetPasswordForm = () => {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        // Extract the token from the URL query parameter "verify"
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('verify');
        
        if (token) {
            setToken(token);
        } else {
            setMessage('Invalid or missing token.');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match.');
            setLoading(false);
            return;
        }
        
        if (!token) {
            setMessage('Invalid or expired token.');
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post('https://job-tracker-backend-x.vercel.app/api/auth/reset-password', {
                token, // Send the token from the query parameter
                password: formData.password,
            });
            setMessage(res.data.message || 'Password has been reset successfully!');
        } catch (error) {
          console.log(error)
            setMessage('Error resetting password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
                    disabled={loading}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
        </div>
    );
};

export default ResetPasswordForm;
