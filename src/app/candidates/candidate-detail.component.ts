import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ICandidate } from './candidate';

@Component({
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})
export class CandidateDetailComponent implements OnInit {
  pageTitle: string ="";
  candidate: ICandidate;

  constructor(private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.candidate = {
      "candidateId": 3,"gender": "male","degree": "Bachelor of Science","yearsofExperience": 0,"technicalSkills": "design","priorExperience": "Chevron","softSkills": "reading comprehension"
    }
  }

  onBack(): void{
    this.router.navigate(['/candidates']);
  }

}
