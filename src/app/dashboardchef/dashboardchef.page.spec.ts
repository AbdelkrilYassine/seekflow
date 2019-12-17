import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardchefPage } from './dashboardchef.page';

describe('DashboardchefPage', () => {
  let component: DashboardchefPage;
  let fixture: ComponentFixture<DashboardchefPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardchefPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardchefPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
