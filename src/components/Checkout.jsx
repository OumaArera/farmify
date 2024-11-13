import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Example counties with their coordinates (this can be expanded with all 47 counties)
const counties = [
  { name: 'Mombasa', coordinates: { lat: -4.0430, lon: 39.6680 } },
  { name: 'Kwale', coordinates: { lat: -4.4510, lon: 39.5170 } },
  { name: 'Kilifi', coordinates: { lat: -3.8510, lon: 39.9440 } },
  { name: 'Tana River', coordinates: { lat: -2.3560, lon: 39.5350 } },
  { name: 'Lamu', coordinates: { lat: -2.2770, lon: 40.9070 } },
  { name: 'Taita/Taveta', coordinates: { lat: -3.3960, lon: 38.9050 } },
  { name: 'Garissa', coordinates: { lat: -0.4550, lon: 39.6620 } },
  { name: 'Wajir', coordinates: { lat: 1.7500, lon: 40.0580 } },
  { name: 'Mandera', coordinates: { lat: 3.9700, lon: 41.8700 } },
  { name: 'Marsabit', coordinates: { lat: 2.3310, lon: 37.9770 } },
  { name: 'Isiolo', coordinates: { lat: 0.3550, lon: 37.5770 } },
  { name: 'Meru', coordinates: { lat: -0.0470, lon: 37.6610 } },
  { name: 'Tharaka-Nithi', coordinates: { lat: -0.4240, lon: 37.8160 } },
  { name: 'Embu', coordinates: { lat: -0.5200, lon: 37.4540 } },
  { name: 'Kitui', coordinates: { lat: -1.3610, lon: 38.0270 } },
  { name: 'Machakos', coordinates: { lat: -1.5140, lon: 37.2490 } },
  { name: 'Makueni', coordinates: { lat: -1.8840, lon: 37.6560 } },
  { name: 'Nyandarua', coordinates: { lat: -0.9480, lon: 36.7370 } },
  { name: 'Nyeri', coordinates: { lat: -0.4230, lon: 36.9490 } },
  { name: 'Kirinyaga', coordinates: { lat: -0.5710, lon: 37.2760 } },
  { name: 'Murang’a', coordinates: { lat: -0.9740, lon: 37.5290 } },
  { name: 'Kiambu', coordinates: { lat: -1.1580, lon: 36.8550 } },
  { name: 'Turkana', coordinates: { lat: 3.1530, lon: 35.9020 } },
  { name: 'West Pokot', coordinates: { lat: 1.0820, lon: 35.0540 } },
  { name: 'Samburu', coordinates: { lat: 1.2700, lon: 37.4130 } },
  { name: 'Trans Nzoia', coordinates: { lat: 1.0460, lon: 34.9510 } },
  { name: 'Uasin Gishu', coordinates: { lat: 0.5070, lon: 35.2800 } },
  { name: 'Elgeyo/Marakwet', coordinates: { lat: 0.7500, lon: 35.0140 } },
  { name: 'Nandi', coordinates: { lat: 1.3330, lon: 35.1350 } },
  { name: 'Baringo', coordinates: { lat: 0.3870, lon: 35.9000 } },
  { name: 'Laikipia', coordinates: { lat: 0.2570, lon: 37.5220 } },
  { name: 'Nakuru', coordinates: { lat: -0.3030, lon: 36.0660 } },
  { name: 'Narok', coordinates: { lat: -1.0910, lon: 35.8630 } },
  { name: 'Kajiado', coordinates: { lat: -1.8890, lon: 36.7410 } },
  { name: 'Kericho', coordinates: { lat: 0.3700, lon: 35.2930 } },
  { name: 'Bomet', coordinates: { lat: -0.7530, lon: 35.3440 } },
  { name: 'Kakamega', coordinates: { lat: 0.2830, lon: 34.7510 } },
  { name: 'Vihiga', coordinates: { lat: -0.0870, lon: 34.6820 } },
  { name: 'Bungoma', coordinates: { lat: 0.5640, lon: 34.5630 } },
  { name: 'Busia', coordinates: { lat: 0.4460, lon: 34.5680 } },
  { name: 'Siaya', coordinates: { lat: 0.0350, lon: 34.2970 } },
  { name: 'Kisumu', coordinates: { lat: -0.0910, lon: 34.7690 } },
  { name: 'Homa Bay', coordinates: { lat: -0.5360, lon: 34.9020 } },
  { name: 'Migori', coordinates: { lat: -1.0730, lon: 34.5610 } },
  { name: 'Kisii', coordinates: { lat: -0.6790, lon: 34.7670 } },
  { name: 'Nyamira', coordinates: { lat: -0.5570, lon: 34.7710 } },
  { name: 'Nairobi City', coordinates: { lat: -1.2860, lon: 36.8210 } }
];




const Checkout = () => {
  const location = useLocation();
  const { state: { cartTotal, checkoutDetails } } = location;

  const [deliveryMode, setDeliveryMode] = useState('');
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [userLocationName, setUserLocationName] = useState('');
  const [distanceFromNairobi, setDistanceFromNairobi] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [totalBill, setTotalBill] = useState(cartTotal);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [vatAmount, setVatAmount] = useState(0);
  const [county, setCounty] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');

  useEffect(() => {
    generateOrderNumber();
    calculateVAT(cartTotal);
  }, [cartTotal]);

  const generateOrderNumber = () => {
    const date = new Date();
    const randomChars = Math.random().toString(36).substring(2, 4).toUpperCase();
    const orderNo = `FMF-${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}-${randomChars}`;
    setOrderNumber(orderNo);
  };

  const calculateVAT = (amount) => {
    const vat = Math.round(amount * 0.16);
    setVatAmount(vat);
  };

  const handleDeliveryModeChange = (mode) => {
    setDeliveryMode(mode);
    if (mode === 'homeDeliveryMyLocation') {
      promptForLocation();
    } else if (mode === 'homeDeliveryNotMyLocation') {
      // Handle county selection logic
      setUserCoordinates(null);
    } else {
      setTransportCost(0); // No transport cost for warehouse pickup
      setTotalBill(cartTotal); // Update total bill without transport cost
    }
  };

  const promptForLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserCoordinates({ latitude, longitude });
        setUserLocationName("Current Location");
        calculateDistanceFromNairobi(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleCountyChange = (selectedCounty) => {
    setCounty(selectedCounty);
    const countyData = counties.find(county => county.name === selectedCounty);
    if (countyData) {
      calculateDistanceFromNairobi(countyData.coordinates.lat, countyData.coordinates.lon);
    }
  };

  const calculateDistanceFromNairobi = (lat, lon) => {
    const nairobiLat = -1.286389;
    const nairobiLon = 36.817223;
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat - nairobiLat) * Math.PI) / 180;
    const dLon = ((lon - nairobiLon) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(nairobiLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
    const distance = Math.ceil(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    setDistanceFromNairobi(distance);
    calculateTransportCost(distance);
  };

  const calculateTransportCost = (distance) => {
    let cost = 0;
    checkoutDetails.forEach((item) => {
      let rate = 0;
      if (item.volume < 100) rate = 10;
      else if (item.volume < 1000) rate = 20;
      else if (item.volume < 10000) rate = 30;
      else rate = 50;
      cost += Math.ceil((distance / 5) * rate);
    });
    setTransportCost(cost);
    const serviceFee = 100; // Flat service fee
    setTotalBill(cartTotal + cost + serviceFee); // Update the total bill with transport and service fee
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCheckout = () => {
    const orderData = {
      orderNumber,
      items: checkoutDetails,
      cartTotal,
      transportCost,
      vatAmount,
      totalBill,
      paymentMethod,
      mpesaNumber: paymentMethod === 'MPESA' ? mpesaNumber : null,
      cardDetails: paymentMethod === 'CARD' ? cardDetails : null,
      deliveryMode,
      userCoordinates,
      userLocationName,
      county,
      specificLocation
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
      .then(response => {
        alert('Order submitted successfully');
      })
      .catch(error => {
        console.error('Error submitting order:', error);
        alert('Failed to submit order');
      });
  };

  return (
    <div className="bg-gray-100 p-8 rounded-md shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Order Summary</h2>
      <div className="bg-white p-6 rounded shadow mb-4">
        <h3 className="text-lg font-semibold text-blue-600">Order Number: {orderNumber}</h3>
        <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
      </div>
      <div className="bg-white p-6 rounded shadow mb-4">
        <label htmlFor="deliveryMode" className="font-medium">Delivery Mode</label>
        <select
          id="deliveryMode"
          className="border p-2 rounded w-full mt-2"
          value={deliveryMode}
          onChange={(e) => handleDeliveryModeChange(e.target.value)}
        >
          <option value="">Select Delivery Mode</option>
          <option value="homeDeliveryMyLocation">Home Delivery (My Current Location)</option>
          <option value="homeDeliveryNotMyLocation">Home Delivery (Not My Current Location)</option>
          <option value="warehousePickup">Warehouse Pickup</option>
        </select>
        {deliveryMode === 'homeDeliveryNotMyLocation' && (
          <div>
            <label htmlFor="county" className="block mt-4">Select County</label>
            <select
              id="county"
              className="border p-2 rounded w-full"
              value={county}
              onChange={(e) => handleCountyChange(e.target.value)}
            >
              <option value="">Select County</option>
              {counties.map((countyData) => (
                <option key={countyData.name} value={countyData.name}>{countyData.name}</option>
              ))}
            </select>
            <label htmlFor="specificLocation" className="block mt-4">Enter Specific Location</label>
            <input
              type="text"
              id="specificLocation"
              className="border p-2 rounded w-full"
              value={specificLocation}
              onChange={(e) => setSpecificLocation(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="bg-white p-6 rounded shadow mb-4">
        <h4 className="font-semibold mb-2">Order Details</h4>
        {checkoutDetails.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name} (x{item.quantity})</span>
            <span>{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded shadow mb-4">
        <h4 className="font-semibold mb-2">Total: KES {cartTotal}</h4>
        <p>VAT (16%): KES {vatAmount}</p>
        <p>Transport Cost: KES {transportCost}</p>
        <p>Service Fee: KES 100</p>
        <h3 className="text-xl font-bold">Total Bill: KES {totalBill}</h3>
      </div>
      <div className="bg-white p-6 rounded shadow mb-4">
        <label htmlFor="paymentMethod" className="font-medium">Payment Method</label>
        <select
          id="paymentMethod"
          className="border p-2 rounded w-full mt-2"
          value={paymentMethod}
          onChange={(e) => handlePaymentMethodChange(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="MPESA">MPESA</option>
          <option value="CARD">Credit Card</option>
        </select>
        {paymentMethod === 'MPESA' && (
          <div className="mt-4">
            <label htmlFor="mpesaNumber" className="block">Enter MPESA Number</label>
            <input
              type="text"
              id="mpesaNumber"
              className="border p-2 rounded w-full"
              value={mpesaNumber}
              onChange={(e) => setMpesaNumber(e.target.value)}
            />
          </div>
        )}
        {paymentMethod === 'CARD' && (
          <div className="mt-4">
            <label htmlFor="cardNumber" className="block">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              className="border p-2 rounded w-full"
              value={cardDetails.cardNumber}
              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
            />
            <label htmlFor="expiry" className="block mt-4">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              className="border p-2 rounded w-full"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <label htmlFor="cvv" className="block mt-4">CVV</label>
            <input
              type="text"
              id="cvv"
              className="border p-2 rounded w-full"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCheckout}
        >
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
