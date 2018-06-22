export class UserDetails {

    public userId: string;
    public emailid: string;
    public password: string;
    public firstName: string;
    public lastName: string;
    public role: string;
    public org: string;
    constructor(uid: string, eid: string, pwd: string, fname: string, lname: string, r: string, o: string) {
        this.emailid = eid;
        this.userId = uid;
        this.password = pwd;
        this.firstName = fname;
        this.lastName = lname;
        this.role = r;
        this.org = o;
    }

}