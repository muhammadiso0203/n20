"use strict";
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EDITOR"] = "editor";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (UserRole = {}));
function canEdit(user) {
    if (user === UserRole.ADMIN || user === UserRole.EDITOR) {
        console.log("EDITED successfully");
    }
    else {
        console.log(`Access denied for role ${user}`);
    }
}
function canDelete(user) {
    if (user === UserRole.ADMIN) {
        console.log("DELETED successfully");
    }
    else {
        console.log(`Access denied for role ${user}`);
    }
}
function canRead() {
    console.log("READ successfully");
}
canEdit(UserRole.VIEWER);
canDelete(UserRole.EDITOR);
canDelete(UserRole.ADMIN);
canRead();
//# sourceMappingURL=main1.js.map