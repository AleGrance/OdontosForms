import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAuditoriaComponent } from './reporte-auditoria.component';

describe('ReporteAuditoriaComponent', () => {
  let component: ReporteAuditoriaComponent;
  let fixture: ComponentFixture<ReporteAuditoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteAuditoriaComponent]
    });
    fixture = TestBed.createComponent(ReporteAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
