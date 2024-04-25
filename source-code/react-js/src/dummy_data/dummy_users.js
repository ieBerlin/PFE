export const DUMMY_USERS = [{
        id: 1,
        name: "Alice Johnson",
        role: "Admin",
        status: "Active",
        email: "alice.johnson@example.com"
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "Member",
        status: "Blocked",
        email: "bob.smith@example.com"
    },
    {
        id: 3,
        name: "Emily Davis",
        role: "Member",
        status: "Active",
        email: "emily.davis@example.com"
    },
    {
        id: 4,
        name: "John Miller",
        role: "Coach",
        status: "Blocked",
        email: "john.miller@example.com"
    },
    {
        id: 5,
        name: "Sarah Wilson",
        role: "Member",
        status: "Blocked",
        email: "sarah.wilson@example.com"
    },
    {
        id: 6,
        name: "Michael Brown",
        role: "Coach",
        status: "Active",
        email: "michael.brown@example.com"
    },
    {
        id: 7,
        name: "Olivia Taylor",
        role: "Member",
        status: "Active",
        email: "olivia.taylor@example.com"
    },
    {
        id: 8,
        name: "David Martinez",
        role: "Admin",
        status: "Active",
        email: "david.martinez@example.com"
    },

];
export const filterUsers = (users, selectedUsers) => {
    return users.filter(user => {
        // Check if the user's role is selected
        const isRoleSelected = Object.entries(selectedUsers.userRole)
            .every(([role, isSelected]) => isSelected || user.role.toLowerCase() !== role);

        // Check if the user's status is selected
        const isStatusSelected = Object.entries(selectedUsers.status)
            .every(([status, isSelected]) => isSelected || user.status.toLowerCase() !== status);

        // Return true only if both role and status are selected
        return isRoleSelected && isStatusSelected;
    });
};