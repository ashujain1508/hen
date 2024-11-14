import { Box, Card, Typography } from '@mui/material';
import ApexChart from 'react-apexcharts';
import userData from '../data/userData.json';

const InvestmentChart = () => {
    const investmentData = userData.userDetails.travel_investment;
    const initialInvestment = investmentData.investmentAmount;
    const currentValue = investmentData.currentValue;
    const growth = currentValue - initialInvestment;

    const chartData = {
        series: [initialInvestment, growth],
        options: {
            labels: ['Initial Investment', 'Growth'],
            colors: ['#00AEEF', '#1E3D6B'], // Barclays Blue, Dark Navy
            tooltip: {
                enabled: true,
                theme: 'light',
                fillSeriesColor: false,
                style: {
                    fontSize: '12px',
                },
                y: {
                    formatter: (val: number) => `£${val.toLocaleString()}`
                },
                custom: ({ series, seriesIndex, w }: any) => {
                    return `<div class="custom-tooltip" style="
                        background: #1e3d6b;
                        padding: 8px;
                        color: white;
                        border-radius: 4px;
                    ">
                        <span>${w.config.labels[seriesIndex]}: £${series[seriesIndex].toLocaleString()}</span>
                    </div>`
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '70%',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '12px',
                                color: '#333'
                            },
                            value: {
                                show: true,
                                fontSize: '12px',
                                color: '#333',
                                formatter: (val: string) => `£${parseFloat(val).toLocaleString()}`
                            }
                        }
                    }
                }
            },
            chart: {
                type: 'donut' as const,
            },
            legend: {
                position: 'bottom' as const,
                fontSize: '12px',
                formatter: function(label: string, opts: any) {
                    return `${label}: £${opts.w.globals.series[opts.seriesIndex].toLocaleString()}`
                }
            },
            dataLabels: {
                enabled: false
            },
        }
    };

    return (
        <Card variant="outlined" sx={{
            borderRadius: '16px',
            border: '1px solid #00AEEF',
        }}>
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    p: 2
                }}
            >
                <Typography variant="subtitle1" color="primary" gutterBottom>
                    Travel Investment Growth
                </Typography>
                
                <ApexChart 
                    type="donut" 
                    series={chartData.series} 
                    options={chartData.options}
                    height={280}
                    width="100%"
                />
                
                <Box sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            display: 'block',
                            mb: 0.5,
                            fontWeight: 700,
                            color: '#0B2F5E',
                            letterSpacing: '0.5px'
                        }}
                    >
                        RETURN RATE
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                        {investmentData.investmentGrowth}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default InvestmentChart; 