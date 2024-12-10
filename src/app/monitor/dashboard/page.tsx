'use client'
import React from 'react'
import withAuth from '@/app/components/auth/withAuth'

const Dashboard = () => {
    return (
        <div className="text-gray-700">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <p>Welcome to the dashboard</p>
        </div>
    );
}

export default withAuth(Dashboard)
