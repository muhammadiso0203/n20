var UserRole;
(function (UserRole) {
    UserRole[UserRole["ADMIN"] = 0] = "ADMIN";
    UserRole[UserRole["EDITOR"] = 1] = "EDITOR";
    UserRole[UserRole["VIEWER"] = 2] = "VIEWER";
})(UserRole || (UserRole = {}));
function canEdit(role) {
    return role === UserRole.ADMIN || role === UserRole.EDITOR;
}
function canDelete(role) {
    return role === UserRole.ADMIN;
}
var user1 = UserRole.ADMIN;
var user2 = UserRole.EDITOR;
var user3 = UserRole.VIEWER;
console.log("Admin edit qiloladimi?:  ".concat(canEdit(user1)));
console.log("Editor edit qiloladimi?:  ".concat(canEdit(user2)));
console.log("Viewer edit qiloladimi:  ".concat(canEdit(user3)));
console.log("Admin delete qiloladimi?:  ".concat(canDelete(user1)));
console.log("Editor delete qiloladimi?:  ".concat(canDelete(user2)));
console.log("Viewer delete qiloladimi?:  ".concat(canDelete(user3)));
