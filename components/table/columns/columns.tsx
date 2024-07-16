"use client"

import { ColumnDef } from "@tanstack/react-table"

import Image from "next/image"

// export const columns: ColumnDef<Appointment>[] = [
    // {
    //     id: "ID",
    //     cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>
    // },
    // {
    //     accessorKey: "patient",
    //     header: "Patient",
    //     cell: ({ row: { original } }) => <p className="text-14-medium">{original.patient.name}</p>
    // },
    // {
    //     accessorKey: "status",
    //     header: "Status",
    //     cell: ({ row: { original } }) => (
    //         <div className="min-w-[115px]">
    //             <StatusBadge status={original.status} />
    //         </div>
    //     )
    // },
    // {
    //     accessorKey: "schedule",
    //     header: "Appointment",
    //     cell: ({ row: { original } }) => (
    //         <p className="text-14-regular min-w-[100px]">
    //             {formatDateTime(original.schedule).dateTime}
    //         </p>
    //     )
    // },
    // {
    //     accessorKey: "primaryPhysician",
    //     header: "Doctor",
    //     cell: ({ row: { original } }) => {
    //         const doctor = Doctors.find(doc => doc.name === original.primaryPhysician)

    //         return (
    //             <div className="flex items-center gap-3">
    //                 <Image
    //                     src={doctor?.image || ''}
    //                     alt={doctor?.name!}
    //                     width={100}
    //                     height={100}
    //                     className="size-8"
    //                 />
    //                 <p className="whitespace-nowrap">
    //                     Dr. {doctor?.name}
    //                 </p>
    //             </div>
    //         )
    //     },
    // },
    // {
    //     id: "actions",
    //     header: () => <p className="pl-4">Actions</p>,
    //     cell: ({ row: { original } }) => <div className="flex gap-1">
    //         <AppointmentModal 
    //             type="schedule"
    //             patientId={original.patient.$id}
    //             userId={original.userId}
    //             appointment={original}
    //         />
    //         <AppointmentModal 
    //             type="cancel"
    //             patientId={original.patient.$id}
    //             userId={original.userId}
    //             appointment={original}
    //         />
    //     </div>,
    // },
// ]