export class Feedback {
    $key:string;
    datePlaced: number;
    constructor(public userId: string, public feedback: any) {
       
        this.datePlaced = new Date().getTime();


    }

}