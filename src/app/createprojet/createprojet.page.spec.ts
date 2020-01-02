import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateprojetPage } from './createprojet.page';

describe('CreateprojetPage', () => {
    let component: CreateprojetPage;
    let fixture: ComponentFixture<CreateprojetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [CreateprojetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(CreateprojetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
