import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit {

  penSelected = true;
  penOptionsVisible = false;
  colorOptionsVisible = false;
  eraserSelected = false;
  eraserSize = 80;

  @ViewChild('whiteboardCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvasContainer', { static: true }) container!: ElementRef<HTMLDivElement>;

  private context!: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastX: number = 0;
  private lastY: number = 0;
  private penSize: number = 1;
  private penColor: string = "#000000";

  ngAfterViewInit(): void {
    this.canvas.nativeElement.width = this.container.nativeElement.offsetWidth;
    this.canvas.nativeElement.height = this.container.nativeElement.offsetHeight;

    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.context.fillStyle = "#FFFFFF"; 
    this.context.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.selectPen();
  }

  toggleOptions(option: 'pen' | 'color') {
    if (option === 'pen') {
      this.penOptionsVisible = !this.penOptionsVisible;
      this.colorOptionsVisible = false;
    } else if (option === 'color') {
      this.colorOptionsVisible = !this.colorOptionsVisible;
      this.penOptionsVisible = false;
    }
  }
  public selectPen() {
    this.penSelected = true;
    this.eraserSelected = false;
    this.canvas.nativeElement.style.cursor = 'crosshair';
  }

  public selectEraser() {
    this.eraserSelected = true;
    this.canvas.nativeElement.style.cursor = 'url(../../../assets/eraser.png), auto';
  }

  // Função que desenha uma linha na tela
  drawLine(x1: number, y1: number, x2: number, y2: number): void {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    if (this.eraserSelected) {
      this.context.strokeStyle = '#FFFFFF';
      this.context.lineWidth = this.eraserSize;
    } else if (this.penSelected) {
      this.context.strokeStyle = this.penColor;
      this.context.lineWidth = this.penSize;
    }
    this.context.stroke();
    this.context.closePath();
  }

  public handleMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    this.lastX = event.offsetX;
    this.lastY = event.offsetY;
    this.canvas.nativeElement.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"none\" stroke=\"%23000\" stroke-width=\"2\" d=\"M2.5,12.5c-1.5-1.5-1.5-3.9,0-5.4L10.6,2.5c1.5-1.5,3.9-1.5,5.4,0l0,0c1.5,1.5,1.5,3.9,0,5.4L7.5,12.5C6,14,4,14,2.5,12.5L2.5,12.5z\" /></svg>'), auto";
  }

  public handleMouseUp(): void {
    this.isDrawing = false;
    this.canvas.nativeElement.style.cursor = "default";
  }

  public handleMouseMove(event: MouseEvent): void {
    this.canvas.nativeElement.style.cursor = "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"none\" stroke=\"%23000\" stroke-width=\"2\" d=\"M2.5,12.5c-1.5-1.5-1.5-3.9,0-5.4L10.6,2.5c1.5-1.5,3.9-1.5,5.4,0l0,0c1.5,1.5,1.5,3.9,0,5.4L7.5,12.5C6,14,4,14,2.5,12.5L2.5,12.5z\" /></svg>'), auto";
    if (!this.isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    this.drawLine(this.lastX, this.lastY, x, y);
    this.lastX = x;
    this.lastY = y;
  }

  public handlePenSizeChange(event: any): void {
    this.penSize = Number(event.target.value);
  }

  public selectPenColor(color: string) {
    this.penColor = color;
  }

  downloadImage() {
    const dataUrl = this.canvas.nativeElement.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'canvas-image.jpeg';
    a.click();
  }

}