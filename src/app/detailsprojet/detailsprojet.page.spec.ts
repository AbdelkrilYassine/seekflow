import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsprojetPage } from './detailsprojet.page';

describe('DetailsprojetPage', () => {
  let component: DetailsprojetPage;
  let fixture: ComponentFixture<DetailsprojetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsprojetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsprojetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
