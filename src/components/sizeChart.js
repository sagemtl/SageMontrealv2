import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const SizeChart = (props) => {
    const {modalOpen, setModalOpen} = props;
    return (
        <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
            <DialogContent>
              <header className="size-guide__heading">
                Size Guides: Short sleeve T-shirts (Centimeters)
              </header>
              <div>
                <table>
                  <tbody>
                  <tr>
                    <th> </th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                  <tr>
                    <th>Width</th>
                    <th>49</th>
                    <th>52</th>
                    <th>56</th>
                    <th>59</th>
                  </tr>
                  <tr>
                    <th>Shoulders</th>
                    <th>44</th>
                    <th>46</th>
                    <th>48</th>
                    <th>51</th>
                  </tr>
                  <tr>
                    <th>Length</th>
                    <th>65</th>
                    <th>67</th>
                    <th>70</th>
                    <th>73</th>
                  </tr>
                  <tr>
                    <th>Sleeve</th>
                    <th>23</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                  </tr>
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
    );
}

export default SizeChart;