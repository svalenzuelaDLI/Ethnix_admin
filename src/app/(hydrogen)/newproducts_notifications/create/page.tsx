'use client';

import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import CreateNotification from '@/app/shared/newproducts_notifications/create-newnotification';
import { metaObject } from '@/config/site.config';


const pageHeader = {
  title: 'Add new notification',
  breadcrumb: [
    {
      href: routes.newproducts_notifications.home,
      name: 'Home',
    },
    {
      href: routes.newproducts_notifications.home,
      name: 'New Products Notifications',
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
