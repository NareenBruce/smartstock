// frontend/src/UserProfile.jsx
import React from 'react';

export default function UserProfile() {
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
                <h2 style={{ fontSize: '1.8rem', borderBottom: 'none', marginBottom: '0.2rem', paddingBottom: 0 }}>Nareen Bruce</h2>
                <p style={{ color: '#60a5fa', fontWeight: '500', marginBottom: '1rem', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.85rem' }}>Store Manager</p>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                    Leading regional operations optimizing inventory flow and mitigating risk using AI-driven decisions.
                </p>

                <div style={{ width: '100%', display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
                    <button className="action-btn" style={{ padding: '0.8rem', fontSize: '0.95rem' }}>Edit Profile</button>
                    <button className="action-btn" style={{ padding: '0.8rem', fontSize: '0.95rem', background: 'transparent', border: '1px solid #334155', color: '#e2e8f0', boxShadow: 'none' }}>Settings</button>
                </div>
            </div>

            {/* Right side: Stats and Recent Activity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2>Performance Overview</h2>
                    <div className="decision-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', marginTop: '1.5rem' }}>
                        <div className="mini-card" style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Sales Logged</h3>
                            <p style={{ fontSize: '1.8rem', color: '#10b981', fontWeight: 'bold' }}>$84,230</p>
                        </div>
                        <div className="mini-card" style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '0.8rem', color: '#94a3b8' }}>AI Requests</h3>
                            <p style={{ fontSize: '1.8rem', color: '#3b82f6', fontWeight: 'bold' }}>142</p>
                        </div>
                        <div className="mini-card" style={{ textAlign: 'center' }}>
                            <h3 style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Risk Averted</h3>
                            <p style={{ fontSize: '1.8rem', color: '#a78bfa', fontWeight: 'bold' }}>12%</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2rem' }}>
                    <h2>Account Details</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
                            <span style={{ color: '#94a3b8' }}>Email Address</span>
                            <span style={{ color: '#f8fafc', fontWeight: '500' }}>nareen.bruce@smartstock.tech</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
                            <span style={{ color: '#94a3b8' }}>Phone Number</span>
                            <span style={{ color: '#f8fafc', fontWeight: '500' }}>+1 (555) 123-4567</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.8rem' }}>
                            <span style={{ color: '#94a3b8' }}>Location</span>
                            <span style={{ color: '#f8fafc', fontWeight: '500' }}>San Francisco, CA</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#94a3b8' }}>Member Since</span>
                            <span style={{ color: '#f8fafc', fontWeight: '500' }}>August 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
