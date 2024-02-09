import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSatisfaccionComponent } from './reporte-satisfaccion.component';

describe('ReporteSatisfaccionComponent', () => {
  let component: ReporteSatisfaccionComponent;
  let fixture: ComponentFixture<ReporteSatisfaccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReporteSatisfaccionComponent]
    });
    fixture = TestBed.createComponent(ReporteSatisfaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
