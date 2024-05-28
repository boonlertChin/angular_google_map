import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWorkingGroupFFComponent } from './dashboard-working-group-ff.component';

describe('DashboardWorkingGroupFFComponent', () => {
  let component: DashboardWorkingGroupFFComponent;
  let fixture: ComponentFixture<DashboardWorkingGroupFFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWorkingGroupFFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardWorkingGroupFFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
