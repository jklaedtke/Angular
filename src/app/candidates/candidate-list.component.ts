import { Component, OnInit } from '@angular/core';
import { ICandidate } from './candidate';
import { CandidateService } from './candidate.service';

@Component({
  selector: 'pm-products',
  templateUrl: './candidate-list.component.html'
})
export class CandidateListComponent implements OnInit{
  pageTitle: string = "Candidate List";
  errorMessage = '';

  _listFilter1: string;
  _listFilter2: string;
  _listFilter3: number;
  upper: number;
  lower: number;

  get listFilter1(): string {
    return this._listFilter1;
  }

  get listFilter2(): string{
    return this._listFilter2;
  }

  get listFilter3(): number{
    return this._listFilter3;
  }

  set listFilter2(value:string){
    this._listFilter2 = value;
    this.filteredCandidates=(this.listFilter1 || this.listFilter2 || this._listFilter3) ? this.performFilter(this.listFilter1, this.listFilter2, this.listFilter3) : this.candidates;
  }

  set listFilter3(value:number){
    this._listFilter3 = value;
    if(this._listFilter3){
      this.upper=200;
      this.lower=0;
    }
    if(this._listFilter3 == 5){
        this.upper = 5;
        this.lower = 0;
    }
    if(this._listFilter3 == 10){
        this.upper = 10;
        this.lower = 6;
    }
    if(this._listFilter3 == 100){
        this.upper = 200;
        this.lower = 11;
    }
    
    this.filteredCandidates=(this.listFilter1 || this.listFilter2 || this._listFilter3) ? this.performFilter(this.listFilter1, this.listFilter2, this.listFilter3) : this.candidates;
  }

  set listFilter1(value:string)
  {
    this._listFilter1 = value;
    this.filteredCandidates=(this.listFilter1 || this.listFilter2 || this._listFilter3) ? this.performFilter(this.listFilter1, this.listFilter2, this.listFilter3) : this.candidates;
  }

  filteredCandidates: ICandidate[];
  candidates: ICandidate[]= [];

  constructor(private candidateService: CandidateService){
    this.listFilter1 = "";
    this.listFilter2 ="";
    this.listFilter3 = null;
  }

  

  performFilter(filterBy1: string, filterBy2: string, filterBy3: number): ICandidate[]
  {
    console.log("PerformFilter Funktion")
    if((filterBy1 != "" && filterBy1 != null) && (filterBy2 != "" && filterBy2 != null) && (filterBy3 != null)){
    filterBy1 = filterBy1.toLocaleLowerCase();
    filterBy2 = filterBy2.toLocaleLowerCase();
    return this.candidates.filter((candidate: ICandidate) =>
        (candidate.degree.toLocaleLowerCase().indexOf(filterBy1) !== -1)&& (candidate.technicalSkills.toLocaleLowerCase().indexOf(filterBy2) !== -1)
      && (candidate.yearsofExperience <= this.upper) && (candidate.yearsofExperience >= this.lower));
    }
    if((filterBy1 != "" && filterBy1 != null) && (filterBy2 != "" && filterBy2 != null)){
    filterBy2 = filterBy2.toLocaleLowerCase();
    filterBy1 = filterBy1.toLocaleLowerCase();
    return this.candidates.filter((candidate: ICandidate) =>
        (candidate.degree.toLocaleLowerCase().indexOf(filterBy1) !== -1)&& (candidate.technicalSkills.toLocaleLowerCase().indexOf(filterBy2) !== -1));
    }
    if((filterBy1 != "" && filterBy1 != null) && (filterBy3 != null)){
      filterBy1 = filterBy1.toLocaleLowerCase();
      return this.candidates.filter((candidate: ICandidate) =>
        (candidate.degree.toLocaleLowerCase().indexOf(filterBy1) !== -1)&& (candidate.yearsofExperience <= this.upper) && (candidate.yearsofExperience >= this.lower));
    }
    if((filterBy2 != "" && filterBy2 != null) && (filterBy3 != null)){
      filterBy2 = filterBy2.toLocaleLowerCase();
      return this.candidates.filter((candidate: ICandidate) =>
        (candidate.technicalSkills.toLocaleLowerCase().indexOf(filterBy2) !== -1)&& (candidate.yearsofExperience <= this.upper) && (candidate.yearsofExperience >= this.lower));
    }
    if(filterBy1 != "" && filterBy1 != null){
      filterBy1 = filterBy1.toLocaleLowerCase();
      return this.candidates.filter((candidate: ICandidate) =>
        (candidate.degree.toLocaleLowerCase().indexOf(filterBy1) !== -1));
    }

    if(filterBy2 != "" && filterBy2 != null){
      filterBy2 = filterBy2.toLocaleLowerCase();
      return this.candidates.filter((candidate: ICandidate) =>
        (candidate.technicalSkills.toLocaleLowerCase().indexOf(filterBy2) !== -1));
    }

    if(filterBy3 != null){
      return this.candidates.filter((candidate: ICandidate) =>
        ((candidate.yearsofExperience <= this.upper)&& (candidate.yearsofExperience >= this.lower)));
    }

    return this.candidates;
  }

  ngOnInit(): void{
    console.log("In OnInit");
    this.candidateService.getCandidates().subscribe(
      candidates =>{ this.candidates = candidates;
        this.filteredCandidates = this.candidates;
      },
      error => this.errorMessage = <any>error
    ); 
    
  }
}