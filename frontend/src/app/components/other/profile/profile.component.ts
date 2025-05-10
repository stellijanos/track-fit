import { CommonModule } from '@angular/common';
import { Component, effect, Input, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { UserState } from '../../../core/states/user.state';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user.model';
import { calculateAge, calculateBMR, calculateIMC, calculateTDEE } from '../../../shared/functions/formulas';
import { defaultUser } from '../../../core/models/model-defaults';

@Component({
    selector: 'app-profile-picture',
    standalone: true,
    imports: [CommonModule, ImageCropperComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})
export class ProfileComponent {


    user: User = defaultUser();

    imageUrl = 'default-profile.png';

    imageChangedEvent: any = '';
    croppedImage: string = '';
    showCropper = false;
    isImageCropped = false;
    croppedBlob: Blob | null = null;

    age = -1;
    imc = '';
    bmr = '';
    tdee = '';

    constructor(private userState: UserState) {
        effect(() => {
            this.user = this.userState.user();
            this.imageUrl = `${environment.apiUrl}/images/${this.user.profilePicture}`;
            this.age = calculateAge(this.user.birthDate);
            this.bmr = calculateBMR(this.user);
            this.imc = calculateIMC(this.user);
            this.tdee = calculateTDEE(this.user);
        });
    }

    onFileChange(event: any): void {
        if (event.target.files && event.target.files.length > 0) {
            this.imageChangedEvent = event;
            this.showCropper = true;
            this.isImageCropped = false;
        } else {
            console.warn('Invalid file input:', event);
        }
    }

    onImageCropped(event: ImageCroppedEvent): void {
        if (!event.blob) {
            console.warn('No blob from cropper:', event);
            return;
        }

        this.croppedImage = URL.createObjectURL(event.blob);
        this.croppedBlob = event.blob;
        this.isImageCropped = true;
    }


    cancelCrop(): void {
        this.showCropper = false;
        this.imageChangedEvent = '';
        this.croppedImage = '';
        this.isImageCropped = false;
    }

    uploadCroppedImage(): void {
        if (!this.croppedBlob) {
            alert('Please crop the image before uploading.');
            return;
        }

        const formData = new FormData();
        formData.append('image', this.croppedBlob, 'profile.png');

        this.userState.changeProfilePicture(formData);
        this.imageUrl = this.croppedImage;
        this.cancelCrop();
    }

    deleteProfilePicture(): void {
        this.userState.deleteProfilePicture();
    }
}
