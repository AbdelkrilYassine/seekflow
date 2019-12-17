import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstabPage } from './detailstab.page';

describe('DetailstabPage', () => {
  let component: DetailstabPage;
  let fixture: ComponentFixture<DetailstabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailstabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
