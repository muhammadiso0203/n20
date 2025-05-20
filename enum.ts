enum UserRole {
    ADMIN,
    EDITOR,
    VIEWER
}

function canEdit(role: UserRole): boolean{
    return role === UserRole.ADMIN || role === UserRole.EDITOR;
}

function canDelete(role: UserRole): boolean{
    return role === UserRole.ADMIN;
}

const user1 = UserRole.ADMIN;
const user2 = UserRole.EDITOR;
const user3 = UserRole.VIEWER;


console.log(`Admin edit qiloladimi?:  ${canEdit(user1)}`)
console.log(`Editor edit qiloladimi?:  ${canEdit(user2)}`)
console.log(`Viewer edit qiloladimi:  ${canEdit(user3)}`)
console.log(`Admin delete qiloladimi?:  ${canDelete(user1)}`)
console.log(`Editor delete qiloladimi?:  ${canDelete(user2)}`)
console.log(`Viewer delete qiloladimi?:  ${canDelete(user3)}`);

