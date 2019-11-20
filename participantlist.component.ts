import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Participant } from './participant';
import { ParticipantService } from '../services/participant.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogBoxComponent } from './dialog-box.component';

@Component({
    selector: 'participant-list',
    templateUrl: './participantlist.component.html',
    styleUrls: ['./participantlist.component.css'],
    providers: [ParticipantService]
})
export class ParticipantListComponent implements OnInit {
    statusMessage: string;
    displayedColumns: string[];
    dataSource: MatTableDataSource<Participant[]>;

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(private participantService: ParticipantService, private dialog: MatDialog) {
        this.displayedColumns = ['participantId', 'participantName', 'address', 'email', 'contactNo', 'gender', 'eventDate', 'events', 'action'];
    }

    ngOnInit(): void {
        this.participantService.fetchAllParticipants()
            .subscribe((successResponse: Participant[]) => {
                this.dataSource = new MatTableDataSource(successResponse);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
                (errorRes) => {
                    this.statusMessage = "Error while fetching Participant Details";
                    console.log(errorRes);
                });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    editRecord(element: Participant): void {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '750px',
            data: {action : 'Edit', formdata : element}
            });

            dialogRef.afterClosed().subscribe(result => {
                    console.log(result);
            });

    }
    deleteRecord(element: Participant): void {
        console.log('navigated');
    }

    showAddDialog(action, obj): void {
        const dialogRef = this.dialog.open(DialogBoxComponent, {
            width: '750px',
            data: {action : 'Add'}
            });

            dialogRef.afterClosed().subscribe(result => {
                    console.log(result);
                    if(action == 'Add') 
                       this.addRowData(result);
            });
    }

    addRowData(row_obj){
        console.log(JSON.stringify(row_obj));
        console.log(JSON.stringify(this.dataSource.data));
        this.dataSource.data.push(row_obj);
    }
    
    updateRowData(row_obj){

    }
    
    deleteRowData(row_obj){
        
    }
}
