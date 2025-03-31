import React from "react";

const Footer = () => {
    return (
        <footer className="bg-black border-t border-green-500/30 p-4 text-center text-green-500/70">
            <div className="container mx-auto">
                <p>
                    <span className="text-green-500">user@stdout</span>:~$ echo "©
                    $(date +%Y) Stdout Journal. All rights reserved."
                </p>
            </div>
        </footer>
    );
};

export default Footer; 