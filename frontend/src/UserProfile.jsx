// frontend/src/UserProfile.jsx
import React, { useState, useEffect } from 'react';

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            name: 'Nareen Bruce',
            role: 'Store Manager',
            bio: 'Leading regional operations optimizing inventory flow and mitigating risk using AI-driven decisions.',
            email: 'nareen.bruce@smartstock.tech',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA'
        };
    });

    useEffect(() => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }, [profile]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="grid-container" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
            {/* Left side: Avatar and Basic Info */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '4px', marginBottom: '1.5rem' }}>
                    <img
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E"
                        alt="User Avatar"
                        style={{ width: '100%', height: '100%', borderRadius: '50%', backgroundColor: '#1e293b', objectFit: 'cover', padding: '12px' }}
                    />
                </div>
                
                {isEditing ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                        <input name="name" value={profile.name} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px', fontSize: '1rem', textAlign: 'center' }} />
                        <input name="role" value={profile.role} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', background: '#0f172a', color: '#60a5fa', border: '1px solid #334155', borderRadius: '4px', fontSize: '0.85rem', textAlign: 'center', textTransform: 'uppercase' }} />
                        <textarea name="bio" value={profile.bio} onChange={handleChange} rows="3" style={{ width: '100%', padding: '0.6rem', background: '#0f172a', color: '#94a3b8', border: '1px solid #334155', borderRadius: '4px', resize: 'vertical', fontSize: '0.95rem' }} />
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '1.8rem', borderBottom: 'none', marginBottom: '0.2rem', paddingBottom: 0 }}>{profile.name}</h2>
                        <p style={{ color: '#60a5fa', fontWeight: '500', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>{profile.role}</p>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                            {profile.bio}
                        </p>
                    </>
                )}

                <div style={{ width: '100%', display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
                    {isEditing ? (
                        <button className="action-btn" onClick={handleSave} style={{ padding: '0.8rem', fontSize: '0.95rem', background: 'linear-gradient(135deg, #10b981, #059669)' }}>Save Changes</button>
                    ) : (
                        <button className="action-btn" onClick={() => setIsEditing(true)} style={{ padding: '0.8rem', fontSize: '0.95rem' }}>Edit Profile</button>
                    )}
                </div>
            </div>

            {/* Right side: Stats and Recent Activity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2>Account Details</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Email Address</span>
                            {isEditing ? (
                                <input name="email" value={profile.email} onChange={handleChange} style={{ padding: '0.4rem 0.6rem', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px', textAlign: 'right', flex: '0 1 200px' }} />
                            ) : (
                                <span style={{ color: '#f8fafc', fontWeight: '500' }}>{profile.email}</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Phone Number</span>
                            {isEditing ? (
                                <input name="phone" value={profile.phone} onChange={handleChange} style={{ padding: '0.4rem 0.6rem', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px', textAlign: 'right', flex: '0 1 200px' }} />
                            ) : (
                                <span style={{ color: '#f8fafc', fontWeight: '500' }}>{profile.phone}</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Location</span>
                            {isEditing ? (
                                <input name="location" value={profile.location} onChange={handleChange} style={{ padding: '0.4rem 0.6rem', background: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '4px', textAlign: 'right', flex: '0 1 200px' }} />
                            ) : (
                                <span style={{ color: '#f8fafc', fontWeight: '500' }}>{profile.location}</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#94a3b8' }}>Member Since</span>
                            <span style={{ color: '#f8fafc', fontWeight: '500' }}>August 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
