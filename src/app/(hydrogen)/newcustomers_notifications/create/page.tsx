'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateNotification from '@/app/shared/newcustomers_notifications/create-newnotification';
import { metaObject } from '@/config/site.config';


const pageHeader = {
  title: 'Add new notification',
  breadcrumb: [
    {
      href: routes.customers.dashboard,
      name: 'Home',
    },
    {
      href: routes.newcustomers_notifications.home,
      name: 'New Customers Notifications',
    },
    {
      name: 'Create',
    },
  ],
};

export default function NotificationCreatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      </PageHeader>

      <CreateNotification />
    </>
  );
}
