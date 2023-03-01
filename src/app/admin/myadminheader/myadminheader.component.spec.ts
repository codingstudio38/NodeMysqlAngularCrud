import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyadminheaderComponent } from './myadminheader.component';

describe('MyadminheaderComponent', () => {
  let component: MyadminheaderComponent;
  let fixture: ComponentFixture<MyadminheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyadminheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyadminheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
