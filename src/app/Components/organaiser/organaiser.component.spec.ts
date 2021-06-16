import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganaiserComponent } from './organaiser.component';

describe('OrganaiserComponent', () => {
  let component: OrganaiserComponent;
  let fixture: ComponentFixture<OrganaiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganaiserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganaiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
