// Example: src/app/page.js
import dynamic from 'next/dynamic';

const DashboardEmbed = dynamic(() => import('../components/DashboardEmbed'), { ssr: false });

function HomePage() {
    return (
        <div>
            <DashboardEmbed />
        </div>
    );
}

export default HomePage;
