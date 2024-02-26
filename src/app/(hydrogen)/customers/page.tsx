import FinancialDashboard from '@/app/shared/customers/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Financial'),
};

export default function AnalyticsPage() {
  return <FinancialDashboard />;
}
