enum UserRole{
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer"
}

function canEdit(user: UserRole) : void{
    if(user === UserRole.ADMIN || user === UserRole.EDITOR){
       console.log("EDITED successfully")
    }else{
       console.log(`Access denied for role ${user}`)
    }
}

function canDelete(user: UserRole) : void{
    if(user === UserRole.ADMIN){
       console.log("DELETED successfully")
    }else{
       console.log(`Access denied for role ${user}`)
    }
}

function canRead() : void{
     console.log("READ successfully")
}


canEdit(UserRole.VIEWER)
canDelete(UserRole.EDITOR)
canDelete(UserRole.ADMIN)
canRead()
