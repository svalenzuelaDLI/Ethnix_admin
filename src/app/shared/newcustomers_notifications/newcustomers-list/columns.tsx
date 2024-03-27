'use client';

import Link from 'next/link';
import { type INewCustomer, INotifications } from '@/types/models/newcustomers';
import { routes } from '@/config/routes';
import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

function getStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-primary-dark">Unassigned</Text>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-primary-dark">Refused</Text>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center">
          <Badge color="primary" renderAsDot />
          <Text className="ms-2 font-medium text-primary-dark">Commercial</Text>
        </div>
      );
      case 4:
        return (
          <div className="flex items-center">
            <Badge color="primary" renderAsDot />
            <Text className="ms-2 font-medium text-primary-dark">Operations</Text>
          </div>
        );
        case 5:
          return (
            <div className="flex items-center">
              <Badge color="primary" renderAsDot />
              <Text className="ms-2 font-medium text-primary-dark">Finance</Text>
            </div>
          );
          case 6:
            return (
              <div className="flex items-center">
                <Badge color="success" renderAsDot />
                <Text className="ms-2 font-medium text-primary-dark">Completed</Text>
              </div>
            );
            case 7:
              return (
                <div className="flex items-center">
                  <Badge color="success" renderAsDot />
                  <Text className="ms-2 font-medium text-primary-dark">Saved in SAP</Text>
                </div>
              );
            case 8:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-primary-dark">Saved in SAP But Pepperi Error</Text>
        </div>
      );
            
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">Unassigned def</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'email',
    key: 'email',
    width: 250,
    hidden: 'email',

    render: (_: string, row: INotifications) => (
      <>
          <Text className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700">
      {row.email}
    </Text>
   
      <Text className="text-[13px] text-gray-500">{`#-${row.id}`}</Text>
    
      </>
  
    ),
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: (name: string) => name,
  },
  {
    title: <HeaderCell title="Position" />,
    dataIndex: 'job',
    key: 'job',
    width: 250,
    render: (name: string) => name,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'customerStatus',
    key: 'customerStatus',
    width: 120,
    render: (value: number) => getStatusBadge(value),
  },
  {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <DeletePopover
          title={`Delete record`}
          description={`Are you sure you want to delete this #${row.id} record?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
