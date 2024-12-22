import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([])
      ],
      declarations: [
        ServicesComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


  it('should render title', () => {
    const fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular');
  });
});
