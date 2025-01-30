import React, { useState } from 'react';
import AllCars from './AllCars';
import ProductCreationPage from './ProductCreationPage';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(0); // Default to first tab (All Cars)

    // Tab titles and components
    const tabs = [
        {
            id: 0,
            title: 'All Cars',
            component: <AllCars />
        },
        {
            id: 1,
            title: '+ Add New Car',
            component: <ProductCreationPage />
        }
    ];

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tabs">
            {/* Tab Navigation */}
            <ul className="nav my-3">
                {tabs.map((tab, index) => (
                    <li className="nav-item me-2 curser-pointer" key={tab.id}>
                        <p
                            role="tab"
                            aria-controls={`tab-${tab.id}`}
                            aria-selected={activeTab === index}
                            className={activeTab === index ? 'active' : ''}
                            onClick={() => handleTabClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab.title}
                        </p>
                    </li>
                ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
                {tabs.map((tab, index) => (
                    <div
                        key={tab.id}
                        className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`}
                        id={`tab-${tab.id}`}
                        role="tabpanel"
                    >
                        {tab.component}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
