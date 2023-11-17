import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatealumnosComponent } from './createalumnos.component';

describe('CreatealumnosComponent', () => {
  let component: CreatealumnosComponent;
  let fixture: ComponentFixture<CreatealumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatealumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatealumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
