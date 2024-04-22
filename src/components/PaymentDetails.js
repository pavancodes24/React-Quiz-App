import React, { useEffect } from 'react';

const PayByRazorPay = () => {
    const options = {
        key: 'rzp_live_eCiBctdExNpJVL',
        amount: '100', //  = INR 1
        name: 'Acme shop',
        description: 'some description',
        image: 'https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png',
        handler: function(response) {
            console.log(response);
            alert(response.razorpay_payment_id);
        },
        prefill: {
            name: 'Gaurav',
            contact: '9999999999',
            email: 'demo@demo.com'
        },
        notes: {
            address: 'some address'
        },
        theme: {
            color: '#FFA500', // orange color
            hide_topbar: false
        }
    };

    const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="pay-container">
            <button className="pay-button" onClick={openPayModal}>
                <span>Pay with Razorpay</span>
            </button>
            <style jsx>{`
                .pay-container {
                    width: 100%;
                    max-width: 300px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: #fff;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                }
                .pay-button {
                    width: 100%;
                    background-color: #f35d21;
                    border: none;
                    color: #fff;
                    font-size: 18px;
                    padding: 15px 0;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                .pay-button:hover {
                    background-color: #e64a19;
                }
                .pay-button span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .pay-button span::after {
                    content: '';
                    background: url('https://res.cloudinary.com/sivadass/image/upload/v1493607354/icons/arrow.svg')
                        no-repeat center;
                    margin-left: 5px;
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                }
            `}</style>
        </div>
    );
};

export default PayByRazorPay;
