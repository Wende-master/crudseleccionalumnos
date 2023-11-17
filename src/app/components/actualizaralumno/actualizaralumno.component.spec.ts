import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaralumnoComponent } from './actualizaralumno.component';

describe('ActualizaralumnoComponent', () => {
  let component: ActualizaralumnoComponent;
  let fixture: ComponentFixture<ActualizaralumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizaralumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizaralumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
