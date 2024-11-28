'use client'

import React, { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

const DoughnutChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext('2d')
    if (!ctx) return

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          label: 'Bar Dataset',
          data: [300, 50, 100, 400, 40, 67,80, 100],
          backgroundColor: [
            "#ff9f9f",
            "#ffffAf",
            "#ff9fd2",
            "#bc9fff",
            "#9ef7ff",
            "#537ff1",
            "#53f1a2",
            "#f19753",
          ],
        }]
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
      chart.destroy()
    }
  }, [])
  return (
    <div className='h-60 p-4 overflow-visible z-40'>
      <canvas ref={chartRef} />
    </div>

  )

}

export default DoughnutChart