import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Box from './box/Box';
import { toast } from 'react-toastify';
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from './dashboard-wrapper/DashboardWrapper'
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar'
import SummaryBox, { SummaryBoxSpecial } from './summary-box/SummaryBox'
import data from './constants/data'
import axios from 'axios';
import colors from './constants/colors'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from './overall-list/OverallList'
import RevenueList from './revenue-list/RevenueList'
import { Line } from 'react-chartjs-2'

import TopNav from './topnav/TopNav'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const getTotalProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/api/products/total/count');
            const productCount = response.data.totalProductCount;
            console.log("response.data", response.data.totalProductCount)
            return productCount;
        } catch (error) {
            console.error('Failed to get total products:', error);
            throw error;
        }
    };
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        getTotalProducts()
            .then(productCount => {
                setTotalProducts(productCount);
            })
            .catch(error => {
                console.error('Error getting total products:', error);
            });
    }, []);

    const [invoices, setInvoices] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5001/api/invoices/unconfirmedCount');
                const fetchedInvoices = response.data.count;          
                setTotalOrders(fetchedInvoices);          
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    const [totalRevenue, setTotalRevenue] = useState(0);
    const getTotalByDate = async (date) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5001/api/invoices/totalInAWeek`);
            const total = response.data.total;
            setTotalRevenue(total);
        } catch (error) {
            toast.error('Error retrieving total revenue.');
        }
    };

    useEffect(() => {
        const date = new Date().toISOString().split('T')[0]; // Ngày hiện tại
        getTotalByDate(date);
    }, []);

    const [totalCustomers, setTotalCustomers] = useState(0);

    const getTotalCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/api/users/totalUser/count');
            const customerCount = response.data.totalUserCount;
            return customerCount;
        } catch (error) {
            console.error('Failed to get total customers:', error);
            throw error;
        }
    };
    useEffect(() => {
        getTotalCustomers()
            .then(customerCount => {
                setTotalCustomers(customerCount);
            })
            .catch(error => {
                console.error('Error getting total customers:', error);
            });
    }, []);

    //Lấy các ngày trong danh tháng hiện tại
    const getCurrentMonthDays = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        const daysInMonth = [];
        for (let i = 1; i <= totalDays; i++) {
            daysInMonth.push(i);
        }

        return daysInMonth;
    };

    const [totalCancelledInvoices, setTotalCancelledInvoices] = useState(0);
    const getTotalCancelledInvoices = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/api/invoices/cancelledCount');
            const cancelledInvoicesCount = response.data.count;
            return cancelledInvoicesCount;
        } catch (error) {
            console.error('Failed to get total cancelled invoices:', error);
            throw error;
        }
    };

    useEffect(() => {
        getTotalCancelledInvoices()
            .then(cancelledInvoicesCount => {
                setTotalCancelledInvoices(cancelledInvoicesCount);
            })
            .catch(error => {
                console.error('Error getting total cancelled invoices:', error);
            });
    }, []);


    const chartOptions = {
        responsive: true,
        scales: {
            xAxis: {
                display: false
            },
            yAxis: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }
    const renderChart = (totalRevenue) => {
        // Generate random data for the chart
        const generateFixedData = () => {
            const data = [1500, 1800, 2000, 1700, 1900, 1600];
            return data;
        };

        // Define the chart data
        const chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Revenue',
                    data: generateFixedData(),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        // Render the chart
        return (
            <div>
                <Line options={chartOptions} data={chartData} width={`250px`} />
            </div>
        );
    };

    // Lấy dữ liệu của năm
    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 10; // Tạo danh sách các năm từ 10 năm trước đến hiện tại
        const yearOptions = [];
        for (let year = startYear; year <= currentYear; year++) {
            yearOptions.push(
                <option key={year} value={year}>
                    {year}
                </option>
            );
        }
        return yearOptions;
    };

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    return (
        <div style={{ padding: '20px' }} className='scrollable-container'>
            <TopNav />
            <DashboardWrapper>
                <DashboardWrapperMain>
                    <div className="row">
                        <div className="col-8 col-md-12" style={{ width: '66%' }}>
                            <div className="row">
                                <div className="col-6 col-md-6 col-sm-12 mb" style={{ marginBottom: '24px' }}>
                                    <Box>
                                        <div className='summary-box'>
                                            <div className="summary-box__info">
                                                <div className="summary-box__info__title">
                                                    <div>Sản phẩm</div>
                                                    <span>Tổng sản phẩm có trong kho</span>
                                                </div>
                                                <div className="summary-box__info__value">
                                                    {totalProducts}
                                                </div>
                                            </div>
                                            <div className="summary-box__chart">
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 mb" style={{ marginBottom: '24px' }}>
                                    <Box>
                                        <div className='summary-box'>
                                            <div className="summary-box__info">
                                                <div className="summary-box__info__title">
                                                    <div>Đơn hàng</div>
                                                    <span>Tổng đơn hàng cần xách nhận</span>
                                                </div>
                                                <div className="summary-box__info__value">
                                                    {totalOrders}
                                                </div>
                                            </div>
                                            <div className="summary-box__chart">
                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 mb" style={{ marginBottom: '24px' }}>
                                    <Box>
                                        <div className='summary-box'>
                                            <div className="summary-box__info">
                                                <div className="summary-box__info__title">
                                                    <div>Hủy đơn hàng</div>
                                                    <span>Tổng đơn hàng đã hủy</span>
                                                </div>
                                                <div className="summary-box__info__value">
                                                    {totalCancelledInvoices}
                                                </div>
                                            </div>
                                            <div className="summary-box__chart">

                                            </div>
                                        </div>
                                    </Box>
                                </div>
                                <div className="col-6 col-md-6 col-sm-12 mb" style={{ marginBottom: '24px' }}>
                                    <Box>
                                        <div className='summary-box'>
                                            <div className="summary-box__info">
                                                <div className="summary-box__info__title">
                                                    <div>Khách hàng</div>
                                                    <span>Tổng số khách hàng</span>
                                                </div>
                                                <div className="summary-box__info__value">
                                                    {totalCustomers}
                                                </div>
                                            </div>
                                            <div className="summary-box__chart">

                                            </div>
                                        </div>
                                    </Box>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 hide-md">
                            <Box purple fullheight>
                                <div className="summary-box-special">
                                    <div className="summary-box-special__title" style={{ whiteSpace: "pre-line", textAlign: "center" }}>
                                        TỔNG TIỀN HÀNG TRONG<br />TUẦN
                                    </div>

                                    <div className="summary-box-special__value">
                                        {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </div>
                                    <div className="summary-box-special__chart">
                                        {/* {renderChart(totalRevenue)} */}
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </div>
                    <div className="row">
                        <select
                            style={{
                                width: '150px',
                                padding: '8px',
                                marginLeft: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                outline: 'none',
                                fontFamily: 'Arial, sans-serif',
                                fontSize: '14px',
                            }}
                            value={selectedYear}
                            onChange={handleYearChange}
                        >
                            <option value="">-- Chọn năm --</option>
                            {getYearOptions()}
                        </select>
                        <div className="col-12">
                            <Box>
                                <RevenueByMonthsChart
                                    labels={data.revenueByMonths.labels}
                                    data={data.revenueByMonths.data}
                                    year={selectedYear}
                                />
                            </Box>
                        </div>
                    </div>
                </DashboardWrapperMain>

            </DashboardWrapper>
        </div>

    )
}

export default Dashboard

const RevenueByMonthsChart = ({ labels, data, year }) => {
    const [revenueData, setRevenueData] = useState([]);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const responseData = [];

                for (let month = 1; month <= 12; month++) {
                    const response = await axios.get('https://localhost:7225/api/Invoices/month', {
                        params: {
                            month: month,
                            year: year
                        }
                    });

                    responseData.push(response.data);
                }

                setRevenueData(responseData);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, [year]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: 'orange',
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: revenueData
            }
        ]
    };

    return (
        <>
            <div className="title mb">Doanh thu theo tháng</div>
            <div>
                <Bar options={chartOptions} data={chartData} height={300} />
            </div>
        </>
    );
};