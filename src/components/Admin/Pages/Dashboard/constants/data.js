// import images from "./images"

const data = {
    user: {
        name: 'Thanh1997',
    },
    summary: [
        {
            title: 'Sản phẩm',
            subtitle: 'Tổng sản phẩm có trong kho',
            value: '34',
            percent: 70
        },
        {
            title: 'Đơn hàng',
            subtitle: 'Tổng đơn hàng trong ngày',
            value: '3000',
            percent: 49
        },
        {
            title: 'Doanh thu',
            subtitle: 'Doanh thu trong ngày',
            value: '2000000VND',
            percent: 38
        },
        {
            title: 'Khách hàng',
            subtitle: 'Tổng nhà khách hàng dùng tài khoản',
            value: '4',
            percent: 55
        }
    ],
    revenueSummary: {
        title: 'Doanh thu',
        value: '1000000VNĐ',
        chartData: {
            labels: ['May', 'Jun', 'July', 'Aug', 'May', 'Jun', 'July', 'Aug'],
            data: [300, 300, 280, 380, 200, 300, 280, 350]
        }
    },
    revenueByChannel: [
        {
            title: 'Direct',
            value: 70
        },
        {
            title: 'External search',
            value: 40
        },
        {
            title: 'Referal',
            value: 60
        },
        {
            title: 'Social',
            value: 30
        }
    ],
    revenueByMonths: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        data: [250, 200, 300, 280, 100, 220, 310, 190, 200, 120, 250, 350]
    }
}

export default data