'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from 'lucide-react'

// Fake data before BE is plugged in
const mockStrategies = [
    { id: 'STR001', name: 'Strategy 1  - Tech Growth', stocks: ['AAPL', 'GOOGL', 'MSFT'], timeframe: '2020-2025' },
    { id: 'STR002', name: 'Strategy 2  - High Risk', stocks: ['JNJ', 'PG', 'KO'], timeframe: '2021-2026' },
    { id: 'STR003', name: 'Strategy 3  - Green Energy', stocks: ['TSLA', 'NEE', 'ENPH'], timeframe: '2022-2027' },
    { id: 'STR001', name: 'Strategy 1  - Tech Growth', stocks: ['AAPL', 'GOOGL', 'MSFT'], timeframe: '2020-2025' },
    { id: 'STR002', name: 'Strategy 2  - High Risk', stocks: ['JNJ', 'PG', 'KO'], timeframe: '2021-2026' },
    { id: 'STR003', name: 'Strategy 3  - Green Energy', stocks: ['TSLA', 'NEE', 'ENPH'], timeframe: '2022-2027' },
    { id: 'STR001', name: 'Strategy 1  - Tech Growth', stocks: ['AAPL', 'GOOGL', 'MSFT'], timeframe: '2020-2025' },
    { id: 'STR002', name: 'Strategy 2  - High Risk', stocks: ['JNJ', 'PG', 'KO'], timeframe: '2021-2026' },
    { id: 'STR003', name: 'Strategy 3  - Green Energy', stocks: ['TSLA', 'NEE', 'ENPH'], timeframe: '2022-2027' },
    { id: 'STR001', name: 'Strategy 1  - Tech Growth', stocks: ['AAPL', 'GOOGL', 'MSFT'], timeframe: '2020-2025' },
    { id: 'STR002', name: 'Strategy 2  - High Risk', stocks: ['JNJ', 'PG', 'KO'], timeframe: '2021-2026' },
    { id: 'STR003', name: 'Strategy 3  - Green Energy', stocks: ['TSLA', 'NEE', 'ENPH'], timeframe: '2022-2027' },
]

const TradingStrategyHomepage: React.FC = () => {
    const [username] = React.useState('Test User')

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome back, <span className="text-[#6b27c0]">{username}</span></h1>
            <p className="text-xl text-gray-400 mb-8">Some inspirational trading quote idk lol</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockStrategies.map((strategy) => (
                    <Card key={strategy.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors">
                        <CardHeader>
                            <CardTitle className="text-2xl font-semibold text-white">{strategy.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-lg">
                            <p className="text-gray-400 mb-3">Strategy ID: {strategy.id}</p>
                            <p className="text-gray-400 mb-3">Stocks: {strategy.stocks.join(', ')}</p>
                            <p className="text-gray-400">Timeframe: {strategy.timeframe}</p>
                        </CardContent>
                    </Card>
                ))}

                <Card className="bg-gray-900 border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <CardContent className="text-center">
                        <PlusCircle className="w-16 h-16 text-[#6b27c0] mb-6 mx-auto" />
                        <p className="text-2xl font-semibold text-white">Add New Strategy</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default TradingStrategyHomepage;