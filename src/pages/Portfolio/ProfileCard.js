import ProfileCard from "../../blocks/Components/ProfileCard/ProfileCard";

export default function ProfilePage() {
    return (
        <div className="profile-card" style={{ 
            height: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center'
        }}>
            <ProfileCard
              name="Nikhil Kanade"
              title="Security Engineer who Love UI/UX"
              handle="nikhilkanade"
              status="Available"
              contactText="Contact Me"
              avatarUrl="/memoji.png"
              iconUrl="/emoji.png"
              grainUrl="/background.png"
              showUserInfo={true}
              showBehindGradient={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGradient="radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(200,100%,90%,var(--card-opacity)) 4%,hsla(200,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(200,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(200,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00d4aa 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#4f46e5 0%,#06b6d4 40%,#06b6d4 60%,#4f46e5 100%)"
              innerGradient="linear-gradient(145deg,rgba(79, 70, 229, 0.3) 0%,rgba(6, 182, 212, 0.2) 100%)"
              onContactClick={() => {
                // Add your contact logic here
                window.open('mailto:your-email@example.com', '_blank');
              }}
            />
        </div>
    )
}