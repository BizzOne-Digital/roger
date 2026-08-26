import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RoseApertureIcon } from '../../components/icons/Icons';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-roseNoir border border-antiqueGold/30 rounded-lg p-8">
        <div className="text-center mb-8">
          <RoseApertureIcon className="w-12 h-12 text-antiqueGold mx-auto mb-4" />
          <h1 className="font-display text-2xl text-warmIvory">Admin Portal</h1>
          <p className="text-warmIvory/50 text-sm mt-2">Red Rose Photo Booth LLC</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-luxury text-warmIvory/70" htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              className="input-luxury bg-charcoal/50 border-antiqueGold/20 text-warmIvory"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label-luxury text-warmIvory/70" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              className="input-luxury bg-charcoal/50 border-antiqueGold/20 text-warmIvory"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-velvetRed text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
