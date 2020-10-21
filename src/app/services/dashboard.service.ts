import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  bigChart()
  {
    return [71, 78, 39, 66];
  }
  
  pieChart()
  {
    return [{
      name: 'Proj1',
      y: 25,
      sliced: true,
      selected: true
  }, {
      name: 'Proj2',
      y: 12
  }, {
      name: 'Proj3',
      y: 4
  }, {
      name: 'Proj4',
      y: 3
  }
  ]
  }
}
