import React, { useEffect } from 'react';

const PayByRazorPayUPI = () => {
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

    const collectUPI = () => {
        const upiOptions = {
            amount: 100,
            email: 'demo@demo.com',
            contact: '9999999999',
            order_id: 'order_123',
            method: 'upi',
            upi: {
                vpa: 'gauravkumar@somebank',
                flow: 'collect'
            }
        };

        window.Razorpay.createPayment(upiOptions)
            .then((response) => {
                console.log(response);
                alert(response.razorpay_payment_id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div style={styles.container}>
            <button style={styles.button} onClick={collectUPI}>Pay with UPI (Razorpay)</button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    button: {
        padding: '15px 25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#f32d2d',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
        outline: 'none',
    }
};

export default PayByRazorPayUPI;
