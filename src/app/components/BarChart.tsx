'use client'

import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

const BarChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const mixedChart = new Chart(ctx, {
      data: {
        datasets: [{
          type: 'bar',
          label: 'Bar Dataset',
          data: [10, 20, 30, 40, 30, 50, 50],
          backgroundColor: '#9ef7ff',
          borderColor: '#000000',
          borderWidth: 2 
        }, {
          type: 'bar',
          label: 'Line Dataset',
          data: [50, 50, 50, 50, 76, 80, 100],
          backgroundColor: '#f19753',
          borderColor: '#000000',
          borderWidth: 2 
        }],
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      },
      options: {
        borderColor: '#000000',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
        },
      }
    })

    return () => {
      mixedChart.destroy()
    }
  }, [])
  return (
    <div className='h-60 w-full'>
      <canvas ref={chartRef} />
    </div>

  )

}

export default BarChart