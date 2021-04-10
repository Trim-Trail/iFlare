import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlareComponent } from './flare.component';

describe('FlareComponent', () => {
  let component: FlareComponent;
  let fixture: ComponentFixture<FlareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
